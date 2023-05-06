export default function Weather({ forecasts }) {
  return (
    <div className='text-center'>
      <h1>3 Day Weather</h1>
      <ul className='list-group'>
        <li className='list-group-item'>
          <p>Date : {forecasts[0].date}</p>
          <p>Description : {forecasts[0].desc}</p>
        </li>
        <li className='list-group-item'>
          <p>Date : {forecasts[1].date}</p>
          <p>Description : {forecasts[1].desc}</p>
        </li>
        <li className='list-group-item'>
          <p>Date : {forecasts[2].date}</p>
          <p>Description : {forecasts[2].desc}</p>
        </li>
      </ul>
    </div>
  );
}
