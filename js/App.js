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

class Section extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: [],
        };
    }
    componentDidMount() {
        axios.get('./data/index.json')
            .then(res => {
                let articles = [];
                res.data.forEach(data => articles.push(data));
                let state = this.state;
                this.setState({
                    state,
                    'articles': articles
                });
            });
    }
    render() {
        return <section className="page-main">
            <div className="container">
                <div id="main-content" className="main-content">
                    {
                        this.state.articles.map((data, index, arr) => {
                            return <div className="main-item" data-id={data.id}>
                                <div className="caption"> <i className={data['caption-icon']}></i>
                                    {data.caption}
                                </div>
                                <div className="content">
                                    <ul className="list clearfix">
                                        {
                                            data.contentList.map((article, i, articles) => {
                                                return <li>
                                                    <a target="_blank" href={article.link}>
                                                        <div className="title">
                                                            <img src={article.logo} alt="" />{article.name}</div>
                                                        <div className="desc">{article.desc}</div>
                                                    </a>
                                                </li>
                                            })
                                        }

                                    </ul>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    }
}

class Footer extends React.Component {
    constructor() {
        super()
    }
    render() {
        return <footer id="footer">
            <div className="container">
                <div className="copyright">Copyright &copy; 2020</div>
            </div>
        </footer>
    }
}

class App extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (<Header />,
            <Section />,
            <Footer />)
    }
}
ReactDOM.render(
    <div>
        <Header />,
        <Section />,
        <Footer />
    </div>
    ,
    document.getElementById('app')
);