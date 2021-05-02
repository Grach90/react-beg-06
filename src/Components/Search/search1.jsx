import {InputGroup, Form, Button, DropdownButton, Dropdown, Row, Col} from 'react-bootstrap';
import style from './search.module.css';
import DatePicker from "react-datepicker";
import {connect} from 'react-redux';
import types from '../../Redux/actionTypes';
import {handleSubmitThunk} from '../../Redux/action';
import {useEffect} from 'react';

const Search = (props) => {
const {
  searchState,
  onChangeInputSearch,
  onChangeDropdown,
  setDate,
  handleSubmit,
  resetState
} = props;

const sortVariants = [
  {
    lable:'A-Z',
    value:'a-z'
  },
  {
    lable:'Z-A',
    value:'z-a'
  },
  {
    lable:'Creation_Date_Oldest',
    value:'creation_date_oldest'
  },
  {
    lable:'Creation_Date_Newest',
    value:'creation_date_newest'
  },
  {
    lable:'Completion_Date_Oldest',
    value:'completion_date_oldest'
  },
  {
    lable:'Completion_Date_Newest',
    value:'completion_date_newest'
  }
]
const statusVariants = [
  {
    lable:'Active',
    value:'active'
  },
  {
    lable:'Done',
    value:'done'
  }
]

const statusJSX = statusVariants.map((status, index) => {
  return (
    <Dropdown.Item 
      key={index}
      onClick={() => onChangeDropdown('status', status.value)}
    >
      {status.lable}
    </Dropdown.Item>
  )
});
const sortJSX = sortVariants.map((sort, index) => {
  return (
    <Dropdown.Item 
      key={index}
      onClick={() => onChangeDropdown('sort', sort.value)}
    >
      {sort.lable}
    </Dropdown.Item>
  )
});

useEffect(() => {
  return () => {
    resetState();
  }
}, [])
  return (
    <div>
      <InputGroup className="mb-3">
            <Form.Control 
              value={searchState.search}
              onChange={onChangeInputSearch}
              placeholder='Search'
            />
            <Button 
              className='ml-3'
              onClick={() => handleSubmit(searchState)}
            >
              Search
            </Button>
      </InputGroup>
      <Row className='justify-content-center'>
      <DropdownButton  
        className='mr-3' 
        variant='info' 
        title={searchState.status || 'Status'}
      >
        {statusJSX}
      </DropdownButton>
      <DropdownButton 
        variant='info' 
        title={searchState.sort || 'Sort'}
      >
        {sortJSX}
      </DropdownButton>
      </Row>
      <div className={style.dateRow}>
        <Row className='flex-column align-content-center'>
            <h4>Create_lte</h4> <DatePicker selected={searchState.create_lte} onChange={(date) => setDate(date, 'create_lte')} />
            Create_gte <DatePicker selected={searchState.create_gte} onChange={(date) => setDate(date, 'create_gte')} />
        </Row>
        <Row className='flex-column align-content-center'>
            Complete_lte <DatePicker selected={searchState.complete_lte} onChange={(date) => setDate(date, 'complete_lte')} />
            Complete_gte <DatePicker selected={searchState.complete_gte} onChange={(date) => setDate(date, 'complete_gte')} />
        </Row>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchState: {...state.searchState}
  }
}
const mapStateToDispatch = (dispatch) => {
  return{
    onChangeInputSearch: (e) => dispatch({type: types.SEARCH_ON_CHANGE, e}),
    onChangeDropdown: (name, value) => dispatch({type: types.DROP_DOWN_ONCHANGE, name, value}),
    setDate: (date, name) => dispatch({type: types.SET_SEARCH_DATE, date, name}),
    handleSubmit: (searchState) => {
      dispatch((dispatch) => handleSubmitThunk(dispatch, searchState));
    },
    resetState: () => dispatch({type: types.RESET_SEARCH_STATE})
  }
}


export default connect(mapStateToProps, mapStateToDispatch)(Search);