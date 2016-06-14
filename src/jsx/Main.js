const Main = React.createClass({
    getInitialState(){
      return {user:""}
    },
    componentWillMount(){
        const userId = getCookie("userId");
        Users.map((user,i)=>{
            if(user.id === userId){
                this.setState({user:user});
            }
        });
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
                    <Header user={this.state.user} changeUser={this.changeUser}/>
                    <Nav />
                    <Content path={this.props.route.path} user={this.state.user}/>
                </div>
            )
        }
    }
});