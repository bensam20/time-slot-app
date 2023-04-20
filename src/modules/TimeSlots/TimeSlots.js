import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
// import { Calendar } from 'primereact/calendar';
import { TimePicker } from "antd";

function TimeSlots() {
  const [timeSlotContainer, setTimeSlotContainer] = useState({
    Sunday: [
      { fromTime: "", toTime: "" },
      { fromTime: "", toTime: "" },
    ],
    Monday: [{ fromTime: "", toTime: "" }],
    Tuesday: [{ fromTime: "", toTime: "" }],
    Wednesday: [
      { fromTime: "", toTime: "" },
      { fromTime: "", toTime: "" },
    ],
    Thursday: [{ fromTime: "", toTime: "" }],
    Friday: [{ fromTime: "", toTime: "" }],
    Saturday: [{ fromTime: "", toTime: "" }],
  });

  console.log(timeSlotContainer);

  const [selectedDays, setSelectedDays] = useState([]);
  const [time, setTime] = useState({ fromTime: "", toTime: "" });

  const onDayChange = (e) => {
    let _selectedDays = [...selectedDays];

    if (e.checked) _selectedDays.push(e.value);
    else _selectedDays = _selectedDays.filter((day) => day !== e.value);

    setSelectedDays(_selectedDays);
  };

  const onChange = (name, e, day, j) => {
    setTime({
      ...time,
      [name]: e,
    });

    setTimeSlotContainer({
      ...timeSlotContainer,
      [day]: timeSlotContainer?.[day].map((v, i) => {
        if (i === j) {
          return { ...v, [name]: e };
        } else {
          return v;
        }
      }),
    });
  };

  return (
    <div>
      <div>
        {Object.keys(timeSlotContainer).map((day, i) => {
          // console.log(i);
          // // console.log(selectedDays);
          // console.log(timeSlotContainer?.[day]);
          return (
            <React.Fragment key={i}>
              <div key={day} className="flex align-items-center">
                <Checkbox
                  inputId={day}
                  name="day"
                  value={day}
                  onChange={onDayChange}
                  checked={selectedDays.some((item) => item === day)}
                />
                <label htmlFor={day} className="ml-2">
                  {day}
                </label>
              </div>
              <div>
                {timeSlotContainer?.[day].map((v, j) => {
                  return (
                    <React.Fragment key={j}>
                      <TimePicker
                        name="fromTime"
                        value={v.fromTime}
                        onChange={(e) => onChange("fromTime", e, day, j)}
                        format="HH:mm"
                        minuteStep={15}
                      />
                      <TimePicker
                        name="toTime"
                        value={v.toTime}
                        onChange={(e) => onChange("toTime", e, day, j)}
                        format="HH:mm"
                        minuteStep={15}
                      />
                      <br />
                    </React.Fragment>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlots;
