'use client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Login from '@/components/Login';
import { CreateAuthContext } from '@/context/AuthContext';
import IsLogin from '@/components/IsLogin';
import { useOutsideClick } from '@/utils/hooks/outSideClick';
import Portal from '@/utils/portal';

export default function NavigationBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { userInformation } = useContext(CreateAuthContext);
  const url = usePathname();

  const modalRef = useOutsideClick(() => {
    setModalOpen(false);
  });

  if (url === '/') return <></>;

  return (
    <nav className="py-6 flex items-center justify-between">
      <div className="font-bold text-2xl basis-[10%] text-center">minki3</div>

      <div>
        {userInformation ? (
          <IsLogin userInformation={userInformation} />
        ) : (
          <span
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            로그인
          </span>
        )}
      </div>
      {modalOpen && (
        <Portal>
          <div
            ref={modalRef}
            className=" absolute top-[50%] left-[50%] p-6 border rounded-xl border-black translate-x-[-50%] translate-y-[-50%] z-1 bg-white"
          >
            <Login
              userInformation={userInformation}
              setModalOpen={setModalOpen}
            />
          </div>
        </Portal>
      )}
    </nav>
  );
}
