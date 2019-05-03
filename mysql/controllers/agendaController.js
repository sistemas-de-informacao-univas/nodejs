const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM agenda', (err, dados_agenda) => {
     if (err) {
      res.json(err);
     }
     res.render('agenda', {
        data: dados_agenda
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO agenda set ?', data, (err, dados_agenda) => {
      console.log(dados_agenda)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM agenda WHERE id = ?", [id], (err, rows) => {
      res.render('agenda_editar', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const novoRegistro = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE agenda set ? where id = ?', [novoRegistro, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM agenda WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
