from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from clerk_backend_api import Clerk
from clerk_backend_api.jwks_helpers import AuthenticateRequestOptions
import os
from typing import Optional

class ClerkAuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_paths: Optional[list[str]] = None):
        super().__init__(app)
        self.clerk = Clerk(bearer_auth=os.getenv('CLERK_SECRET_KEY'))
        self.protected_paths = protected_paths or ["/api/volunteer"]

    async def dispatch(self, request: Request, call_next):
        # Check if the path should be protected
        if not any(request.url.path.startswith(path) for path in self.protected_paths):
            return await call_next(request)

        try:
            # Get the authorization header
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                raise HTTPException(status_code=401, detail="No authorization header")

            # Authenticate the request
            request_state = self.clerk.authenticate_request(
                request,
                AuthenticateRequestOptions(
                    authorized_parties=['your-frontend-url']  # Replace with your frontend URL
                )
            )

            if not request_state.is_signed_in:
                raise HTTPException(status_code=401, detail="User not authenticated")

            # Get user details from Clerk
            user = self.clerk.users.get(request_state.user_id)
            
            # Add user information to request state
            request.state.user = {
                "id": user.id,
                "email": user.email_addresses[0].email_address if user.email_addresses else None,
                "username": user.username,
                "phone_number": user.phone_numbers[0].phone_number if user.phone_numbers else None,
                "first_name": user.first_name,
                "last_name": user.last_name
            }

            return await call_next(request)

        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=401, detail=str(e))