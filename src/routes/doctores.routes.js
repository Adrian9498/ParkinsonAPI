import {Router} from 'express';

import {google} from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import path from 'path';
import fs from 'fs';
import readline from 'readline';

import {getDoctor,createDoctor} from '../controllers/doctores.controller.js';

const router = Router();
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'src/routes/credentials.json');
let nombre_archivo = "";
let id_archivo = "";
let link_archivo = "";
router.post('/api/login', getDoctor);

router.post('/api/createDoctor', createDoctor);



router.get('/api/get-access-token', async (req,res) => {

    fs.readFile('src/routes/credentials.json',  async (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        //authorize(JSON.parse(content), listFiles);
        nombre_archivo = req.query.nombre
        authorize(JSON.parse(content), listFiles);
        
    });
    await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({id: id_archivo});

});


function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);//list files and upload file
        //callback(oAuth2Client, '0B79LZPgLDaqESF9HV2V3YzYySkE');//get file

    });
}


function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

async function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });
    await getList(drive, '');
}
function getList(drive, pageToken) {
    drive.files.list({
        corpora: 'user',
        pageSize: 10,
        q: "name='"+nombre_archivo+"'",
        pageToken: pageToken ? pageToken : '',
        fields: 'nextPageToken, files(*)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            //processList(files);
            if (res.data.nextPageToken) {
                getList(drive, res.data.nextPageToken);
            }
            id_archivo = files[0].id

            // files.map((file) => {
            //     console.log(`${file.name} (${file.id})`);
            // });
        } else {
            console.log('No files found.');
        }
    });
}
function processList(files) {
    console.log('Processing....');
    files.forEach(file => {
        // console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
        console.log(file.id);
       
    });
}
function uploadFile(auth) {
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
        'name': 'test22.jpg'
    };
    var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream('test22.jpg')
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('File Id: ', res.data.id);
        }
    });
}
function getFile(auth, fileId = id_archivo) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data);
    });
}


export default router;