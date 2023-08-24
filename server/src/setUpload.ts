import { Express } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as path from 'path';

export const setUpload = (app: Express) => {
  app.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: 'No files were uploaded.' });
    }

    const file = req.files.file as UploadedFile;
    const uploadPath = __dirname + '/assets/' + file.name;

    file.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      res.send({ url: `/img/${file.name}` });
    });
  });

  app.get('/img/*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'assets', ...req.path.replace('/img/', '').split('/')));
  });
};
