import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = `${environment.apiBaseUrl}/Authentication/register`;

  constructor(private http: HttpClient) {}

  register(formData: any): Observable<any> {
const role = formData.role.charAt(0).toUpperCase() + formData.role.slice(1).toLowerCase();
const params = new HttpParams().set('role', role);


  const isPatient = role?.toLowerCase() === 'patient';

  const payload: any = {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    phone: formData.phoneNumber,
    region: formData.region,
    address: formData.address,
    birthday: formData.dateOfBirth,
    gender: formData.gender,
    isDisabled: isPatient
  };

  if (isPatient) {
    payload.desabilityType = formData.disabilityType;
    payload.medicalCondition = formData.medicalConditionDescription;
    payload.emergencyContactName = formData.emergencyContactName;
    payload.emergencyContactPhone = formData.emergencyContactPhone;
    payload.emergencyContactRelation = formData.emergencyContactRelation;
  } else if (role?.toLowerCase() === 'helper') {
    payload.description = formData.bio;
  }

  console.log('Register() called');
  console.log('Payload:', payload);
  console.log('Params:', params.toString());

  return this.http.post(this.baseUrl, payload, { params }).pipe(
    tap(response => {
      console.log('Register response:', response);
    }),
    catchError(error => {
      console.error('Register error:', error);
      return throwError(() => error);
    })
  );
}


  login(credentials: { email: string; password: string }): Observable<any> {
  const url = `${environment.apiBaseUrl}/Authentication/login`;

  console.log('Login called with:', credentials);

  return this.http.post(url, credentials).pipe(
    tap((res: any) => {
      console.log('Login response:', res);

      const token = res.token;
      if (token) {
        localStorage.setItem('authToken', token);


        const payload: any = jwtDecode(token);

        const userId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || payload['sub'];
        const role = payload['role'] || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (userId) localStorage.setItem('userId', userId);
        if (role) localStorage.setItem('role', role);

        console.log('Decoded role:', role);
        console.log('Decoded userId:', userId);
      }
    }),
    catchError(err => {
      console.error('Login error:', err);
      return throwError(() => err);
    })
  );
}
}
