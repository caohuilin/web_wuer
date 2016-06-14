//Header组件
const Header = React.createClass({
    getInitialState(){
      return {exitShow:false}
    },
    exitHandleShow(){
        this.setState({exitShow:!this.state.exitShow});
    },
    exit(){
      document.cookie="";
        this.props.changeUser("");
    },
    render () {
        return (
            <header className="header">
                <div className="menu"><i className="fa fa-bars" /></div>
                <div className="logo"><span className="school">HNUST</span><span className="wuer">WuEr</span></div>
                <div className="user" onClick={this.exitHandleShow}><i className="fa fa-user" />
                    {this.props.user.name}
                    <div className="exit" style={css_display(this.state.exitShow)} onClick={this.exit}>退出登录</div>
                </div>
            </header>
        )
    }
});
