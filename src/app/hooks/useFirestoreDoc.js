import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "./../firestore/firestoreService";
import { asyncActionError } from "./../async/asynchReducer";
import { asyncActionFinish, asyncActionStart } from "../async/asynchReducer";

export default function useFirestoreDoc({
  query,
  data,
  deps,
  shouldExcecute = true,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!shouldExcecute) return;
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: "not-found",
              message: "Could not find document",
            })
          );
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError())
    );
    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
