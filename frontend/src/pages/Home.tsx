import Mapbox from "../components/map/Map";
import{  NewsMarqueeVertical} from "../components/NewsMarquee";
export default function Home() {
  return (
    <div className="p-4">
      <div className="flex justify-between gap-5">
      <NewsMarqueeVertical /> 
        <Mapbox />
       
      </div>
    </div>
  );
}
