import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer:{
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const NewStudentView = ({
  firstname,
  lastname,
  email,
  imageUrl,
  gpa,
  campusId,
  campuses,
  errors,
  handleChange,
  handleSubmit
}) => {
  const classes = useStyles();

  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
            Add a Student
          </Typography>
        </div>

        <form style={{textAlign: 'center'}} onSubmit={handleSubmit}>
          <label style={{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
          <input type="text" name="firstname" value={firstname} onChange={handleChange} />
          {errors.firstname && <p style={{color:"red"}}>{errors.firstname}</p>}
          <br/><br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
          <input type="text" name="lastname" value={lastname} onChange={handleChange} />
          {errors.lastname && <p style={{color:"red"}}>{errors.lastname}</p>}
          <br/><br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
          <input type="text" name="email" value={email} onChange={handleChange} />
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
          <br/><br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
          <input type="text" name="imageUrl" value={imageUrl} onChange={handleChange} />
          <br/><br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA (0.0 - 4.0): </label>
          <input type="text" name="gpa" value={gpa} onChange={handleChange} />
          {errors.gpa && <p style={{color:"red"}}>{errors.gpa}</p>}
          <br/><br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus: </label>
          <select name="campusId" value={campusId ?? ""} onChange={handleChange}>
            <option value="">Not Enrolled</option>
            {campuses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <br/><br/>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <br/><br/>
        </form>
      </div>
    </div>
  );
};

export default NewStudentView;
