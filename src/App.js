import {connect} from 'react-redux';
import Home from './Home';
import { fetchFromAPI } from './store/actions/api_actions';

const mapStateToProps = state => {
    return {
        API: state.APIReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startFetch: () => dispatch(fetchFromAPI())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);