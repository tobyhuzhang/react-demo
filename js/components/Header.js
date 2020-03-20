class Header extends React.Component {
    constructor() {
        super();
        this.handleClickNav = this.handleClickNav.bind(this);
        this.state = {
            navList: [],
        };
    }
    componentDidMount() {
        axios.get('./data/index.json')
            .then(res => {
                let navList = [];
                res.data.forEach(data => navList.push({ "id": data.id, "name": data.name, "caption": data.caption, "caption-icon": data['caption-icon'] }));
                let state = this.state;
                this.setState({
                    state,
                    'navList': navList
                });
            });
    }
    handleClickNav(e) {
        let currentDom = e.target
        e.preventDefault();
        console.info(currentDom.parentNode);
        let toDataId = currentDom.getAttribute("data-for");
        console.info(toDataId);
        let mainItemTop = document.querySelector("div[data-id=" + toDataId + "]");
        var elementPosition = mainItemTop.getBoundingClientRect().top -100;
        //mainItemTop.scrollIntoView();
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
       });
    }
    render() {
        return <header id="header">
            <div className="container">
                <h2 className="logo">
                    <a target="_blank" href="http://www.kotall.com/">
                        <img src="./img/logo.png" alt="" />
                    </a>
                </h2>
                <nav id="nav" className="nav">
                    <ul>
                        {
                            this.state.navList.map((nav, index, arr) => {
                                let style = "";
                                if (0 === index) {
                                    style = "active";
                                }
                                return <li className={style} key={nav.id}>
                                    <a target="_blank" href="javascript:void(0);" data-for={nav.id} onClick={this.handleClickNav}>{nav.name}</a>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div>
        </header>;
    }
}

// export default Header;