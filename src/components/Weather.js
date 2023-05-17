export default function Weather({ forecasts }) {
  return (
    <div className='mt-2 text-center card p-2'>
      <h1 className=''>{forecasts.length} Day Weather</h1>
      <ul className='list-group'>
        {forecasts.map((day, idx) => {
          return (<li key={idx} className='list-group-item'>
                    <p>Date : {day.date}</p>
                    <p>Description : {day.desc}</p>
                  </li>);
        })}
      </ul>
    </div>
  );
}
