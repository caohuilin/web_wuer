//Header组件
const Header = React.createClass({
    render () {
        return (
            <header className="header">
                <div className="menu"><i className="fa fa-bars" /></div>
                <div className="logo"><span className="school">HNUST</span><span className="wuer">WuEr</span></div>
                <div className="user"><i className="fa fa-user" /></div>
            </header>
        )
    }
});
