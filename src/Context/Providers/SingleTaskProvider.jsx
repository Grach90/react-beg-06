import {singleTaskContext} from '../Context';
import {withRouter} from "react-router-dom";
import {useState, useCallback} from 'react';
import PropTypes from "prop-types";

const SingleTaskProvider = (props) => {
  const [singleTask, setSingleTask] = useState(null);
  const [isModalAddTask, setIsModalAddTask] = useState(true);
  const [loading, setLoading] = useState(false);

  const removeTask = useCallback(() => {
    setLoading(true);
    fetch(`http://localhost:3001/task/${singleTask._id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) throw data.error;
      props.history.push("/");
    })
    .catch(error => {
      console.log("Error", error)
      setLoading(false);
    }); 
  }, [singleTask,props.history]);
  
  const handleCloseModal = useCallback(() => {
    setIsModalAddTask(!isModalAddTask);
  }, [isModalAddTask]);

  const handleEditTask = useCallback((singleTask) => {
    setLoading(true);
    fetch(`http://localhost:3001/task/${singleTask._id}`, {
        method: "PUT",
        body: JSON.stringify(singleTask),
        headers: {
          "Content-Type":"application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.error) throw data.error;
        setSingleTask(data);
        setIsModalAddTask(true);
      })
      .catch(error => console.log("Error", error))
      .finally(() => setLoading(false));
  }, []);

  const forUseEffect = useCallback(() => {
    const {id} = props.match.params;
    fetch(`http://localhost:3001/task/${id}`)
    .then(response => response.json())
    .then(singleTask => {
      if(singleTask.error) throw singleTask.error;
      setSingleTask(singleTask);
    })
    .catch((error) => props.history.push('/error', error));
  }, [props.match.params, props.history]);
  
  return (
    <singleTaskContext.Provider
      value = {{
        //state
        singleTask,
        isModalAddTask,
        loading,
        //functions
        removeTask,
        handleCloseModal,
        handleEditTask,
        forUseEffect
      }}
    >
        {props.children}
    </singleTaskContext.Provider>
  )
}
SingleTaskProvider.propTypes = {
  singleTask: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      _id: PropTypes.string,
      date: PropTypes.object
    }),
    PropTypes.object
  ]),
  handleEditTask: PropTypes.func
}

export default withRouter(SingleTaskProvider);