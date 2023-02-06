import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(private firestore: AngularFirestore) { }

    createActions(doc:any, data:any) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection("actions")
                .doc(doc)
                .collection("chats")
                .add(data)
                .then(res => { }, err => reject(err));
        });
    }

    getActions(doc:any) {
        return this.firestore.collection("actions").doc(doc).collection("chats", ref => ref.orderBy("createdAt")).snapshotChanges();
    }

    getBadge(doc:any) {
        return this.firestore.collection("users").doc(doc.toString()).snapshotChanges();
    }
}
