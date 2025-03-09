'use client';

import React, { useState, useActionState } from 'react';
import { createCollection } from './action';

export default function CollectionForm() {
  const [collection, setCollection] = useState({
    name: '',
    description: '',
  });

  const [state, action, isPending] = useActionState(createCollection, {
    success: false,
    errors: {
      name: [],
      description: [], 
      general: [],
    },
  });

  const formData = new FormData();
  formData.append('name', collection.name);
  formData.append('description', collection.description); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">コレクションの作成</h1>
        {state.success && (
          <div className="mb-4 text-green-600">
            コレクションが作成されました
          </div>
        )}
        {state.errors?.general && (
          <div className="mb-4 text-red-600">
            {state.errors.general.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
        )}  
        <form action={action}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              名前
            </label>
            <input
              id="name"
              type="text"
              value={collection.name}
              onChange={(e) => setCollection({ ...collection, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {state.errors?.name && (
            <div className="mb-4 text-red-600">
              {state.errors.name.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              説明
            </label>
            <textarea
              id="description"
              value={collection.description}
              onChange={(e) => setCollection({ ...collection, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {state.errors?.description && ( 
            <div className="mb-4 text-red-600">
              {state.errors.description.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isPending ? '作成中...' : '作成'}
          </button>
        </form>
      </div>
    </div>
  );
}
