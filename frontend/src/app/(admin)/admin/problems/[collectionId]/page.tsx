'use client';

import React, { useActionState } from 'react';
import { createProblem } from './actions';  
import { useParams } from 'next/navigation';

export default function NewProblemPage() {
  const params = useParams();
  const collectionId = params.collectionId as string;
  const [state, action, pending] = useActionState(createProblem, {
    errors: {
      general: [],
    },
    success: false,
  });

  return (
    <div>
      <h1>新規問題登録</h1>
      <form action={action}>
        <input type="hidden" name="collectionId" value={collectionId} />
        <div>
          <label htmlFor="problem">問題</label>
          <textarea id="problem" name="problem" required />
        </div>
        <button type="submit">
          {pending ? '登録中...' : '登録'}
        </button>
      </form>
      {state.errors?.general && (
        <div>
          {state.errors.general.map((error, index) => (
            <p key={index} style={{ color: 'red' }}>
              {error}
            </p>
          ))}
        </div>
      )}
      {state.success && <p style={{ color: 'green' }}>問題が正常に登録されました。</p>}
    </div>
  );
}
