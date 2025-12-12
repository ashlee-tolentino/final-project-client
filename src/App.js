import "./App.css";
import { Switch, Route } from "react-router-dom";

import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer,
  NewCampusContainer,
  EditCampusContainer,
  EditStudentContainer,
} from "./components/containers";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />

        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/campuses/new" component={NewCampusContainer} />      {/* Add Campus */}
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/campus/:id/edit" component={EditCampusContainer} /> {/* Edit Campus */}

        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/newstudent" component={NewStudentContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        <Route exact path="/student/:id/edit" component={EditStudentContainer} /> {/* Edit Student */}
      </Switch>
    </div>
  );
};

export default App;