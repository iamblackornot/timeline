# Timeline Widget

Reads data from `public/data.json` and displays it using `@mui/lab/Timeline`

`data.json` example:

```json
{
    "items":
        [
            { "time": "2024-04-19 14:00", "content": "past event 1" },
            { "time": "2024-04-19 17:00", "content": "active event" },
            { "time": "2024-04-19 18:00", "content": "upcoming event 1" },
            { "time": "2024-04-19 19:00", "content": "upcoming event 2" }
        ]
}
```

![This how it looks](assets/example.png)