const Section3 = React.createClass({
    render(){
        const list = Prize.map((p,i)=>{
           return(
               <li>
                   <img src={p.src}/>
                   <div className="des">{p.name}</div>
               </li>
           )
        });
        return (
            <section className="section3">
                <div className="logo"><img src="./public/img/logo_prize.png" alt=""/></div>
                <ul className="prize">
                    {list}
                </ul>

            </section>
        )
    }
});