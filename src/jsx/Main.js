const Main = React.createClass({
    getInitialState(){
      return {user:""}
    },
    changeUser(user){
      this.setState({user:user})
    },
    render(){
        if(this.state.user === ""){
            return <Login changeUser={this.changeUser}/>
        }else {
            return (
                <div className="main">
                    <Header user={this.state.user}/>
                    <Nav />
                    <Content path={this.props.route.path}/>
                </div>
            )
        }
    }
});