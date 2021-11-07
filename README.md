# COMP5216 Group Project

---

# Running Guide

---

### Frontend

- Install npm
- Run `cd frontend` go to frontend directory
- Run following command to install necessary packages
    
    ```bash
    npm install
    ```
    
- Using following command to run frontend, the frontend server will run on [localhost://8000](http://localhost:8000) by default
    - MacOS/Linux 
        ```bash
        npm start
        ```
    - Windows
        ```bash
        npm start-win
        ```

### Backend

1. Please use the IDE `Intellij IDEA` open the project:
    File -> Open -> Choose “motiongame” directory -> OK

2. Then please use the IDE build and run the server application:
    Run -> Run 'MotionGameApplication'

Note: By default, the API server would be running on port 3000. If the port is occupied, please change it on `application.properties` file and you should also change the API server port setting in the frontend sourcecode as well.