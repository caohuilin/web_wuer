const Nav = React.createClass({
    render(){
        return(
            <nav className="mainMenu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/story">点点滴滴</Link></li>
                    <li><Link to="/prize">荣誉墙</Link></li>
                    <li><Link to="/partner">小伙伴</Link></li>
                    <li><Link to="say">畅所欲言</Link></li>
                </ul>
            </nav>
        )
    }
})