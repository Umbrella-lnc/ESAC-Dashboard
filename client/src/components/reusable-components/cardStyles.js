import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        width: '300px',
        height: '140px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        justifyContent: 'space-between',
        minWidth: '160px',
        maxWidth: '200px',
    },
    activateButton: {
        width: '100%',
        color: 'blue',
    },
    skinnyDeleteButton: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: 0,
        width: '20%',
        color: 'blue',
        marginTop: '10px',
        marginBottom: '10px',
    },
    deleteButton: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: 0,
        width: '100%',
        color: 'blue',
        marginTop: '10px',
        marginBottom: '10px',
    },
    paper: {
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        right: '50%',
        top: '10%',
        transform: 'translate(-50%, 50%)',
        textAlign: 'center',
        width: 400,
        backgroundColor: 'white',
        outline: 'none',
    },

    selectRow: {
        float: 'left',
    },
    subHeadingList: {
        textAlign: 'center',
        listStyle: 'none',
    },
    listItem: {
        display: 'inline',
        marginLeft: '10px',
        marginRight: '10px',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        width: 100,
    },
})

export { useStyles }
