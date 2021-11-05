# Routes

- GET: **/timetable/get/:id** (id will be the uuid of the timetable)
- POST: **/timetable/save** (REQUEST BODY will have a body identical to the JSON template leave field "id" undefined to create new entry; "id": [uuid] to update existing entry)
- POST: **/timetable/savestatic** (REQUEST BODY "id": [uuid] to create a static save for existing id)

