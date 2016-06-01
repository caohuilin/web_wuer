const Main = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render(){
        return (
            <div className="main">
                <Header />
                <Nav />
                <Content path={this.props.route.path} />
            </div>
        )
    }
});


