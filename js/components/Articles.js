
class Articles extends React.Component {
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

// export default Articles;