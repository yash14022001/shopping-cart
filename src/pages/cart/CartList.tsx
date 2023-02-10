import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getStateCartItems } from "src/redux/cart/cart.selector";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  actionDecreaseItem,
  actionIncreaseItem,
} from "src/redux/cart/cart.action";
import { products } from "../dashboard/data/products";
import { Box, IconButton } from "@mui/material";
import {
  AddCircleOutline,
  DeleteOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const CartList = () => {
  const items = useSelector(getStateCartItems);
  const dispatch = useDispatch();

  return (
    <Grid item xs={12}>
      <Paper
        sx={{ p: 2, display: "flex", flexDirection: "column", minWidth: 400 }}
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          My cart
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {products.find((p) => p.id === row.id)?.name}
                </TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() =>
                      dispatch(
                        actionDecreaseItem({
                          id: row.id,
                          count: row.count,
                        })
                      )
                    }
                    color="error"
                  >
                    <DeleteOutline />
                  </IconButton>

                  <IconButton
                    onClick={() =>
                      dispatch(
                        actionIncreaseItem({
                          id: row.id,
                          count: 1,
                        })
                      )
                    }
                    color="success"
                  >
                    <AddCircleOutline />
                  </IconButton>

                  <IconButton
                    onClick={() =>
                      dispatch(
                        actionDecreaseItem({
                          id: row.id,
                          count: 1,
                        })
                      )
                    }
                    color="warning"
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {items.length === 0 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Link to={"/dashboard"}>Add some items?</Link>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default CartList;
