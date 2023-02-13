import { connect } from 'react-redux'
import BlogUserBlock from '../Blog/BlogUserBlock'
import UserView from '../User/UserView'

const viewChanger = ({ view }) => {
    console.log(view)
    return <>{Object.keys(view).length !== 0 ? <UserView /> : <BlogUserBlock />}</>
}

const mapStateToProps = (state) => {
    return {
        view: state.viewChanger,
    }
}

export default connect(mapStateToProps, null)(viewChanger)
