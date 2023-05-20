function WeatherDay({ day, idx }) {
  return (
    <li key={idx} className='list-group-item'>
      <p>Date : {day.date}</p>
      <p>Description : {day.desc}</p>
    </li>
  );
}

export default WeatherDay;
