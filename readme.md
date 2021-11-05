# Database Creds for testing
Check orm config

# Routes

- GET: **/timetable/get/:id** (id will be the uuid of the timetable) => Returns the template with the data
- POST: **/timetable/save** (REQUEST BODY will have a body identical to the JSON template leave field "id" undefined to create new entry; "id": [uuid] to update existing entry) => returns the template with a id if saved successfully
- POST: **/timetable/savestatic** (REQUEST BODY "id": [uuid] to create a static save for existing id) => returns the template with id if save successful


# REQUEST BODY TEMPLATE
```json

{
	"timetable" : {
    
		"name" : "Sample Table",
		"numrows" : 3,
		"numcols" : 2,
		"rows" : [
			"Monday",
			"Wednesday",
			"Friday"
		],
		"cols" : [
			{
				"start" : "08:00",
				"end" : "09:00"
			},
			{
				"start" : "09:00",
				"end" : "10:00"
			}
		],
		"slots" : [
			{
				"title" : "Class 1",
				"row" : 0,
				"col" : 1
			}
		],
    "id": "UUID STRING OPTIONAL(LEAVE UNDEFINED TO CREATE NEW TABLE)"
	}
}

```
