# Routes

GET: /timetable/get/:id (id will be the uuid of the timetable)
POST: /timetable/save (REQUEST will have a body identical to the JSON template leave field "id" undefined to create new entry; "id": [uuid] to update existing entry)
POST: /timetable/savestatic ("id": [uuid] to create a static save for existing id)

