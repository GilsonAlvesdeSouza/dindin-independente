import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface inputProps extends InputHTMLAttributes<HTMLElement> {}

export function Input({ ...rest }: inputProps) {
	return <input className={styles.input} {...rest} />;
}
interface textProps extends TextareaHTMLAttributes<HTMLElement> {}

export function Text({ ...rest }: textProps) {
	return <textarea className={styles.input} {...rest}></textarea>;
}
