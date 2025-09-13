import TopProfile from "./TopProfile";
import NavLink from "./NavLink";
function Rebate(params) {
    return <>

        <div className="container-fluid bg-dark text-white vh-100">
            <div className=" rounded-5">

                <div className="pt-4">
                    <table style={{ width: "100%", marginTop: "60px", paddingTop: "20px", background: "aliceblue", borderRadius: "10px" }}>
                        <thead>
                            <tr className="table-row text-white" style={{ background: "linear-gradient(90deg, #4b6cb7, #182848)" }}>
                                <th>Rebate</th>
                                <th>A</th>
                                <th>B</th>
                                <th>C</th>
                            </tr>
                        </thead>
                        <tbody className="text-dark table-data">
                            <tr>
                                <td>7000</td>
                                <td>6</td>
                                <td>3</td>
                                <td>2</td>
                            </tr>
                            <tr className="bg-white">
                                <td>16000</td>
                                <td>15</td>
                                <td>7</td>
                                <td>4</td>
                            </tr>
                            <tr >
                                <td>30,000</td>
                                <td>28</td>
                                <td>14</td>
                                <td>6</td>
                            </tr>
                            <tr className="bg-white">
                                <td >50,000</td>
                                <td>47</td>
                                <td>24</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>80,000</td>
                                <td>70</td>
                                <td>38</td>
                                <td>15</td>
                            </tr>
                            <tr className="bg-white">
                                <td>100,000</td>
                                <td>90</td>
                                <td>48</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>150,000</td>
                                <td>140</td>
                                <td>72</td>
                                <td>30</td>
                            </tr>
                            <tr className="bg-white">
                                <td>200,000</td>
                                <td>180</td>
                                <td>96</td>
                                <td>40</td>
                            </tr>
                            <tr>
                                <td>250,000</td>
                                <td>230</td>
                                <td>120</td>
                                <td>50</td>
                            </tr>
                            <tr className="bg-white">
                                <td>350,000</td>
                                <td>320</td>
                                <td>165</td>
                                <td>70</td>
                            </tr>
                            <tr>
                                <td>500,000</td>
                                <td>450</td>
                                <td>230</td>
                                <td>95</td>
                            </tr>
                            <tr className="bg-white">
                                <td>650,000</td>
                                <td>600</td>
                                <td>300</td>
                                <td>140</td>
                            </tr>
                            <tr>
                                <td>800,000</td>
                                <td>750</td>
                                <td>375</td>
                                <td>180</td>
                            </tr>
                            <tr className="bg-white">
                                <td>1,000,000</td>
                                <td>940</td>
                                <td>450</td>
                                <td>220</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}
export default Rebate;