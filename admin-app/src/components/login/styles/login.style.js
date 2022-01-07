import backgroundImage from '../images/delivery-background.jpg';

const st = () => ({
    container: {
        minHeight: '100vh',
        width: 'vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`
    },

    formContainer: {
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        padding: '80px',
        minHeight: '550px',
        justifyContent: 'space-around',
    },

    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
    },

    titleTextField: {
        fontSize: '35px',
        marginBottom: '60px !important',
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    inTitleTextField: {
        fontSize: '20px',
        marginBottom: '10px'
    },

    inputTextField: {
        maxHeight: '50px',
        backgroundColor: 'white',
        minWidth: '300px !important'
    },

    loginBtn: {
        marginTop: '20px',
        borderRadius: '20px',
        minHeight: '48px !important'
    },

    signUpContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '60px'
    },

    signUpTxtField: {
        fontSize: '14px',
        textDecoration: "none",
        color: 'black'
    },

    forgotPassTextField: {
        textDecoration: "none",
        fontSize: '14px',
        alignSelf: 'flex-end',
        color: 'black',
        '&:hover' : {
            color: 'blue'
        },
        marginBottom: '10px'
    },

    signUpBtn: {
        '&:hover': {
            color: 'blue'
        },
        fontSize: '14px',
        textDecoration: "none",
        color: 'black',
        fontWeight: 'bold'
    },

    integrationContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '130px',
        paddingTop: '50px',
    },

    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '15px'
    },

    icon: {
        height: '100px',
        width: '100px'
    }
});

export default st;