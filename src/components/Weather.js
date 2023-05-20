import WeatherDay from "./WeatherDay";
export default function Weather({ forecasts }) {
  return (
    <div className='mt-2 text-center card p-2'>
      <h1 className=''>{forecasts.length} Day Weather</h1>
      <ul className='list-group'>
        {forecasts.map((day, idx) => {
          return (<WeatherDay day={day} idx={idx} />);
        })}
      </ul>
    </div>
  );
}
