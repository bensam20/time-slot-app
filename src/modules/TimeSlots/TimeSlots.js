import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
// import { Calendar } from 'primereact/calendar';
import { TimePicker } from "antd";
import { Button } from 'primereact/button';

function TimeSlots() {
  const [timeSlotContainer, setTimeSlotContainer] = useState({
    Sunday: [{ fromTime: "", toTime: "" },],
    Monday: [{ fromTime: "", toTime: "" }],
    Tuesday: [{ fromTime: "", toTime: "" }],
    Wednesday: [{ fromTime: "", toTime: "" },],
    Thursday: [{ fromTime: "", toTime: "" }],
    Friday: [{ fromTime: "", toTime: "" }],
    Saturday: [{ fromTime: "", toTime: "" }],
  });

  const [selectedDays, setSelectedDays] = useState([]);

  const onDayChange = (e) => {
    let _selectedDays = [...selectedDays];

    if (e.checked) _selectedDays.push(e.value);
    else _selectedDays = _selectedDays.filter((day) => day !== e.value);

    setSelectedDays(_selectedDays);
  };

  const onChange = (name, e, day, j) => {

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

  const addNewTimeSlot = (day) => {
    setTimeSlotContainer({
      ...timeSlotContainer,
      [day]: [...timeSlotContainer?.[day],
            { fromTime: "", toTime: "" }]
    })
  }

  const deleteTimeSlot = (index, day) => {
    const newArr = timeSlotContainer?.[day].filter((v,i) => {
      return i!==index
    })
    setTimeSlotContainer({
      ...timeSlotContainer,
      [day]: newArr
    })
  }

  return (
    <div>
      <div>
        {Object.keys(timeSlotContainer).map((day, i) => { 
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
              {selectedDays.includes(day) ? <>
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
                      { timeSlotContainer?.[day].length !== 1 ? <Button onClick={() => deleteTimeSlot(j, day)} style={{ margin: "0px 5px", height: "25px"}} icon="pi pi-trash" /> : ""}
                      { j === timeSlotContainer?.[day].length - 1 ? <><Button onClick={() => addNewTimeSlot(day)} style={{height: "25px"}} icon="pi pi-plus" /></> : "" }
                      <br />
                    </React.Fragment>
                  );
                })}

              </>
              : ""}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlots;
