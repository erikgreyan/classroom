"use strict";

window.addEventListener("DOMContentLoaded", async () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const fetchData = async (roomType, roomName) => {
        try {
            const response = await fetch(`http://localhost:3001/api/schedules?roomType=${roomType}&roomName=${roomName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const classrooms = document.querySelector(".classrooms");
    const spaces = document.querySelector(".spaces");
    const meetingrooms = document.querySelector(".meetingrooms");
    const other = document.querySelector(".other");

    classrooms.addEventListener("click", () => {
        roomTypeFind("Classroom");
    });

    spaces.addEventListener("click", () => {
        roomTypeFind("Space");
    });

    meetingrooms.addEventListener("click", () => {
        roomTypeFind("Meetingroom");
    });

    other.addEventListener("click", () => {
        roomTypeFind("Others");
    });

    const roomTypeFind = async (roomType) => {
        let roomNames = [];

        switch (roomType) {
            case "Classroom":
                roomNames.push(
                    "Ada Lovelace",
                    "Alan Turing",
                    "Claude Shannon",
                    "Donald Knuth",
                    "Library",
                    "William Shockley"
                );
                break;
            case "Space":
                roomNames.push("Black", "Blue", "Yellow", "Green");
                break;
            case "Meetingroom":
                roomNames.push("Darth Vader", "Sirius", "Proxima");
                break;
            case "Others":
                roomNames.push("Recording Room", "Call Room N2");
                break;
        }

        const select = document.getElementById("select_room");

        while (select.options.length > 0) {
            select.remove(0);
        }

        roomNames.forEach(optionText => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            select.appendChild(option);
        });

        select.addEventListener("change", async () => {
            localStorage.setItem("roomName", select.value);
            createCalendar(await fetchData(localStorage.getItem("roomType"), localStorage.getItem("roomName")));
        });

        localStorage.setItem("roomType", roomType);
        localStorage.setItem("roomName", roomNames[0]);

        createCalendar(await fetchData(localStorage.getItem("roomType"), localStorage.getItem("roomName")));
    };

    const createCalendar = (result) => {
        const calendar = document.getElementById("calendar");
        calendar.innerHTML = "";
        days.forEach((day) => {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("calendar-day");
            dayDiv.innerHTML = `<h3>${day}</h3>`;
            calendar.appendChild(dayDiv);
        });
        if (result.data.length > 0) {
            result.data.forEach(event => {
                const eventDate = new Date(event.startDate).getDay();
                const calendarDay = calendar.children[eventDate];
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("calendar-event");
                const eventInfo = document.createElement("div");
                eventInfo.textContent = `${event.group} (${event.teacher})`;
                eventDiv.textContent = `${new Date(event.startDate).toLocaleTimeString()} - ${new Date(event.endDate).toLocaleTimeString()}`;
                eventDiv.appendChild(eventInfo);
                calendarDay.appendChild(eventDiv);
            });
        } else {
            const calendar = document.getElementById("calendar");
            const eventTag = document.createElement("h2");
            eventTag.textContent = "No Valid data";
            calendar.appendChild(eventTag);
        }
    };

});
