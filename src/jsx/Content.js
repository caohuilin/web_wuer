//Content组件
const Content = React.createClass({
    render () {
        let con = null;
        switch (this.props.path) {
            case "/home" :
                con = <Section1 />;
                break;
            case "/story" :
                con = <Section2 />;
                break;
            case "/prize" :
                con = <Section3 />;
                break;
            case "/partner" :
                con = <Section4 />;
                break;
            case "/say" :
                con = <Section5 />;
                break;
        }
        return (
            <div className="content">
                {con}
            </div>
        )
    }
});


