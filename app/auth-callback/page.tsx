'use client'
import { use, useEffect } from 'react';
import { handleCallback } from '../../utils/auth';
import { getApi } from '../../utils/auth';
import useSWR from 'swr'
import { get } from 'http';

const AuthCallback = () => {
  useEffect(() => {console.log(window.location.href); handleCallback()}, [])
  return <div>Authenticating...</div>;
};

export default AuthCallback;