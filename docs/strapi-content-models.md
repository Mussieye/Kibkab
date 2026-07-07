# Strapi content model contracts

Create these collection types in Strapi so the frontend fetch utilities map
cleanly.

## ministries

- `name` (Text, required)
- `slug` (UID from `name`, required)
- `summary` (Text, required)
- `focus` (Text, required)
- `schedule` (Text, required)
- `lead` (Text, required)

## leaders

- `name` (Text, required)
- `role` (Text, required)
- `description` (Rich text or Text, required)

## sermons

- `title` (Text, required)
- `speaker` (Text, required)
- `date` (Date, required)
- `mediaUrl` (Text, required)
- `series` (Text, optional)
- `tags` (JSON array of strings, optional)

## events

- `title` (Text, required)
- `dateTime` (DateTime, required)
- `location` (Text, required)
- `rsvpLink` (Text, optional)

## blog-posts

- `title` (Text, required)
- `slug` (UID from `title`, required)
- `excerpt` (Text, required)
- `body` (Rich text, required)
- `featuredImage` (Text, optional)
- `tags` (JSON array of strings, optional)

## gallery-albums

- `title` (Text, required)
- `slug` (UID from `title`, required)
- `year` (Number, required)
- `imageUrls` (JSON array of strings, optional)

## permissions

For public read access during development:

- Settings -> Users & Permissions plugin -> Roles -> Public
- Enable `find` and `findOne` for each collection type above

For production:

- Prefer token-authenticated requests and keep public permissions minimal.
