import ex from "express";
import { connection } from "./database.js";

const app = ex();
app.use(ex.json());


app.post("/products", async (req, res) => {
  const result = await connection.query("SELECT * from products");

  if ((result.findIndex((i) => i.id === req.body.id)) !== -1) {
    res.status(500).send("Terdapat Duplikat ID");
  } else {
    await connection.execute(
      "INSERT INTO products (id,name_product,price) VALUES (? , ? , ?)",
      [req.body.id, req.body.name_product, req.body.price]
    );
    res.send("Products berhasil ditambahkan");
  }
});

app.put("/products/:id", async (req, res) => {

  const result = await connection.query("SELECT * from products WHERE id=?",[req.params.id]);
  if(result == 0){
    res.status(500).send("Tidak terdapat ID yang dituju");
  }
  else{
    await connection.execute("UPDATE products set name_product=?, price=? WHERE id=?", [
      req.body.name_product,
      req.body.price,
      req.params.id,
    ]);
    res.send("Product berhasil di update");
  }

});

app.get("/products", async (req, res) => {
  try {
    const result = await connection.query("SELECT * from products");
    res.json(result);
  } catch (err) {
    console.error("Kesalahan dalam query:", err);
    res.status(500).send("Kesalahan server");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const result = await connection.query("SELECT * from products WHERE id=?",[req.params.id]);
    if(result == 0){
      res.status(500).send("Tidak terdapat ID yang dituju");
    }
    else{
      res.json(result);
    }
  } catch (err) {
    console.error("Kesalahan dalam query:", err);
    res.status(500).send("Tidak terdapat ID yang dituju");
  }
});


app.delete("/products/:id", async (req, res) => {
  await connection.execute("DELETE from products WHERE id=?", [req.params.id]);
  res.send("PRODUCT BERHASIL DIHAPUS");
});

// TANPA BASIS DATA
// // {
// let datas = [
//     {
//         "id":1,
//         "name":"Hanif Fauzan",
//         "gender":"male"
//     },
//     {
//         "id":2,
//         "name":"Salim Hidayat",
//         "gender":"male"
//     },
//     {
//         "id":3,
//         "name":"Imran S",
//         "gender":"male"
//     },
// ];

// app.get("/coba", (req,res)=> {
//     res.send("Hello world");
// });

// app.post("/add-data",(req,res)=>{
//     datas.push(req.body);

//     res.send("Data berhasil ditambah");
// });

// app.get("/view-data", (req,res)=>{
//     res.send(datas);
// });

// app.put("/edit-data-by-index/:index",(req,res)=> {
//     const indexData = datas.findIndex((data,i)=> i == req.params.index);
//     if(indexData !== -1){
//         datas[indexData] = req.body;

//         res.send("Data berhasil diubah");
//     }
//     else{
//         res.status(404).send("Data tidak ditemukan");
//     }

// });

// app.put("/edit-data-by-id/:id",(req,res)=> {
//     const idData = datas.findIndex((data) => data.id == req.params.id);
//     if(idData !== -1){
//         datas[idData] = {...datas[idData],...req.body};

//         res.send("Edit Data by Id berhasil diubah");
//     }
//     else{
//         res.status(404).send("Data tidak ditemukan");
//     }

// });

// app.delete("/delete-data-by-index/:index",(req,res)=> {
//     const indexData = datas.findIndex((data,i)=> i == req.params.index);
//     if(indexData !== -1){
//         datas.splice(indexData,1);
//         res.send("Data berhasil dihapus");
//     }
//     else{
//         res.status(404).send("Data tidak ditemukan");
//     }
// })

// app.delete("/delete-data-by-id/:id",(req,res)=> {
//     const idData = datas.findIndex((data)=> data.id == req.params.id);
//     if(idData !== -1){
//         datas.splice(idData,1);
//         res.send("Data berhasil dihapus");
//     }
//     else{
//         res.status(404).send("Data tidak ditemukan");
//     }
// })

// // }

app.listen(3000, () => {
  console.log("Succesfully");
});
