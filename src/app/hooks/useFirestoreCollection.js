import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncActionFinish, asyncActionStart } from '../async/asynchReducer';
import { dataFromSnapshot } from './../firestore/firestoreService';
import { asyncActionError } from './../async/asynchReducer';

export default function useFirestoreCollection({ query, data, deps }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc));
                data(docs)
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError())
        );
        return () => {
            unsubscribe()
        }
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}