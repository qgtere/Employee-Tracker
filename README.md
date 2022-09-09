# Employee Tracker

![badge](https://img.shields.io/badge/License-MIT-yellow)

## Description
 As a business owner, this CMS let you easily organize your company. You can view, add, update and remove your company's departments, roles and employees on your database in a friendly way.

## Table of Content
* [Installation and Usage](#installation-and-usage)
* [Sneak Peek](#sneak-peek)
* [Link to the video](#link-to-the-video)
* [Techs](#techs)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation and Usage

To install the necessary dependencies, run the following command on your CLI:
```bash
    npm i
```
Once you had installed the dependencies described, create an .env file and change it with your own information if applicable:
```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=yourUser
    DB_PASS=yourPassword
```
Create the database schema and add some data:
```bash
    #work on MySQL
    mysql -u root -p
    # to create the DB schema
    db/SOURCE schema.sql
    # to add some data (optional)
    db/SOURCE seeds.sql
```
Now you can start working:
```bash
    node index.js
```

## Sneak Peek
![Application Preview](./images/sneakpeek.gif)

## Link to the video
[Link to the video](https://drive.google.com/file/d/1edvY4EUD7txMueGU1QCwTUjxNurVLfP1/view)

## Techs
* Javascript
* Node.js
* MySQL

## License
 Licensed under the [MIT](https://opensource.org/licenses/MIT)
 license.

## Contributing 
 The open source community is a great place to inspire and learn thanks to contributions, feel free to make yours!
    If you have a suggestion that would make this better, I'm happy to hear from you.

## Questions
  You can see more of my work on [qgtere](https://github.com/qgtere).

  If you have any additional questions please don't hesitate to reach me on qg.tere@gmail.com.  