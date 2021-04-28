var faker = require('faker');

    var randomName = faker.name.findName(); // Rowan Nikolaus
    var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    var randomCard = faker.helpers.createCard(); // random contact card containing many properties

    function HomePage(props) {
        
        const {children, error } = props;
        console.log('children on HomePage',children)
        
        const {globalState, globalDispatch} = useContext(GlobalState);
        
        
    
        return <Typography>Ciao</Typography>
    }