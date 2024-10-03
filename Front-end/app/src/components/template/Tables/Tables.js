import TheadTable from "@/components/layouts/InputData/TheadTable";
import TBodyTable from "@/components/layouts/InputData/TBodyTable";
import Table from 'react-bootstrap/Table';

function Tables(){
    return (
        <Table responsive>
            <TheadTable>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
            </TheadTable>
            <TBodyTable>
                <td>Carlos</td>
                <td>Sanchez</td>
                <td>23</td>
            </TBodyTable>
            <TBodyTable>
                <td>Carlos</td>
                <td>Sanchez</td>
                <td>23</td>
            </TBodyTable>
            <TBodyTable>
                <td>Carlos</td>
                <td>Sanchez</td>
                <td>23</td>
            </TBodyTable>
        </Table>

    )
}

export default Tables;