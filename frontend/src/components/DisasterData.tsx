import {
    Cloud,
    CloudSnow,
    Droplets,
    Flame,
    CloudRain,
    Mountain,
    MountainSnow,
    Wind,
    Waves,
    Thermometer,
    AlertTriangle
  } from 'lucide-react';
  
  const disasterData = [
    {
      title: 'Avalanche',
      icon: <MountainSnow size={24} className="text-white" />,
      color: 'bg-blue-600',
      precautions: [
        'Avoid areas prone to avalanches during times of high risk',
        'Carry avalanche safety gear such as transceivers, probes, and shovels',
        'Travel in groups and keep an eye on each other',
        'Be aware of warning signs like recent snowfall, wind-loading, and terrain features'
      ]
    },
    {
      title: 'Heatwave',
      icon: <Thermometer size={24} className="text-white" />,
      color: 'bg-orange-500',
      precautions: [
        'Stay hydrated and avoid prolonged exposure to the sun',
        'Use fans or air conditioning to stay cool',
        'Check on vulnerable individuals like the elderly and young children',
        'Dress in lightweight, light-colored clothing'
      ]
    },
    {
      title: 'Flood',
      icon: <Droplets size={24} className="text-white" />,
      color: 'bg-blue-500',
      precautions: [
        'Evacuate to higher ground if necessary',
        'Avoid walking or driving through floodwaters',
        'Turn off utilities if instructed to do so',
        'Have an emergency flood kit ready with essential items'
      ]
    },
    {
      title: 'Hurricane',
      icon: <Wind size={24} className="text-white" />,
      color: 'bg-purple-600',
      precautions: [
        'Follow evacuation orders from local authorities',
        'Board up windows and secure outdoor items',
        'Stay indoors during the storm',
        'Have a communication plan in place with family and friends'
      ]
    },
    {
      title: 'Landslide',
      icon: <Mountain size={24} className="text-white" />,
      color: 'bg-amber-700',
      precautions: [
        'Avoid areas susceptible to landslides during heavy rainfall',
        'Monitor for signs of land movement like cracks or unusual noises',
        'Evacuate if instructed by authorities',
        'Have an emergency plan and supplies ready'
      ]
    },
    {
      title: 'Blizzard',
      icon: <CloudSnow size={24} className="text-white" />,
      color: 'bg-sky-700',
      precautions: [
        'Stay indoors and avoid unnecessary travel',
        'Keep emergency supplies stocked, including food, water, and blankets',
        'Dress warmly in layers if you must go outside',
        'Watch for signs of frostbite and hypothermia'
      ]
    },
    {
      title: 'Cyclone',
      icon: <CloudRain size={24} className="text-white" />,
      color: 'bg-cyan-600',
      precautions: [
        'Evacuate if advised by local authorities',
        'Secure loose objects and reinforce windows and doors',
        'Stay indoors during the storm',
        'Listen to weather updates from reliable sources'
      ]
    },
    {
      title: 'Tsunami',
      icon: <Waves size={24} className="text-white" />,
      color: 'bg-teal-600',
      precautions: [
        'Evacuate immediately if you are in a tsunami evacuation zone',
        'Move inland or to higher ground',
        'Stay away from the coast and low-lying areas',
        'Listen to emergency alerts and follow instructions'
      ]
    },
    {
      title: 'Volcano',
      icon: <Flame size={24} className="text-white" />,
      color: 'bg-red-600',
      precautions: [
        'Follow evacuation orders from authorities if in an affected area',
        'Protect yourself from ashfall by staying indoors with windows and doors closed',
        'Wear masks to protect against volcanic ash inhalation',
        'Monitor volcanic activity updates from official sources'
      ]
    },
    {
      title: 'Earthquake',
      icon: <AlertTriangle size={24} className="text-white" />,
      color: 'bg-stone-700',
      precautions: [
        'Drop, cover, and hold on during shaking',
        'Move away from windows and heavy objects',
        'Have an emergency kit with supplies like water, food, and first aid',
        'Identify safe spots in each room of your home'
      ]
    },
    {
      title: 'Drought',
      icon: <Cloud size={24} className="text-white" />,
      color: 'bg-yellow-600',
      precautions: [
        'Conserve water by fixing leaks and reducing usage',
        'Avoid outdoor burning and adhere to water restrictions',
        'Plant drought-resistant crops and trees',
        'Monitor water sources and report any issues promptly'
      ]
    },
    {
      title: 'Tornado',
      icon: <Wind size={24} className="text-white" />,
      color: 'bg-emerald-700',
      precautions: [
        'Seek shelter in a sturdy building or underground',
        'Stay away from windows and doors',
        'If outdoors, find a low-lying area and lie flat, covering your head',
        'Have a tornado emergency plan for your household'
      ]
    }
  ]
  export default disasterData;
  