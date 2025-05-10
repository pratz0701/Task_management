# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Steps in the app->
1. User is on homescreen -> fetch current user 
                                success-> navigate to tasksListPage
                                failure-> navigate to login
2. Authentication flow in login page
                                success-> Add cookies (refresh token and accessToken)
                                          navigate to homescreen
                                          STEP 1 is repeated again there.
                                failure-> stay on login page
3. Inside TaskPageList

                fetch first 5 tasks 

                UI->
                [ TASKS LIST 
                   {title,description,edittask(navigate to upsert button with taskId in parameter),deletetask}
                   {title,description,edittask(navigate to upsert button with taskId in parameter),deletetask}
                   .....
                ]
                SHOW MORE BUTTON -> fetch furthur 5 tasks
                ADD TASK BUTTON -> navigate to upsert screen

4. Upsert Page
            If taskId is present-> make API calls for update
            else make API calls for create

5. Delete component
            deleted the existing tasks
                        


