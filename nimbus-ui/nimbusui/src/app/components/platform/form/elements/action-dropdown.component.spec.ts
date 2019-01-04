'use strict';
import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementRef } from '@angular/core';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { JL } from 'jsnlog';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ActionLink } from './action-dropdown.component';
import { ActionDropdown } from './action-dropdown.component';
import { PageService } from '../../../../services/page.service';
import { CustomHttpClient } from '../../../../services/httpclient.service';
import { LoaderService } from '../../../../services/loader.service';
import { ConfigService } from '../../../../services/config.service';
import { Page } from '../../../../shared/app-config.interface';
import { ParamConfig } from '../../../../shared/param-config';
import { Param } from '../../../../shared/param-state';
import { WebContentSvc } from '../../../../services/content-management.service';
import { LoggerService } from '../../../../services/logger.service';
import { SessionStoreService, CUSTOM_STORAGE } from '../../../../services/session.store';
import { AppInitService } from '../../../../services/app.init.service';
import { Image } from '../../image.component';
import { Link } from '../../link.component';
import { SvgComponent } from '../../svg/svg.component';
import { configureTestSuite } from 'ng-bullet';
import { setup, TestContext } from '../../../../setup.spec';
import * as data from '../../../../payload.json';
import { ActionDropdownLink } from './action-dropdown.component.mockdata.spec';
import { ServiceConstants } from './../../../../services/service.constants';
import { By } from '@angular/platform-browser';
import { ComponentTypes } from './../../../../shared/param-annotations.enum';

let pageservice, configservice;

class MockLoggerService {
    debug() { }
    info() { }
    error() { }
}

const declarations = [
  ActionLink,
  Image,
  Link,
  SvgComponent
 ];
 const imports = [
     HttpModule,
     HttpClientTestingModule,
     StorageServiceModule,
     AngularSvgIconModule
 ];
 const providers = [
  { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
  { provide: 'JSNLOG', useValue: JL },
  {provide: LoggerService, useClass: MockLoggerService},
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  Location,
  PageService,
  CustomHttpClient,
  LoaderService,
  ConfigService,
  SessionStoreService,
  AppInitService
 ];
 let fixture, hostComponent;
describe('ActionLink', () => {

  configureTestSuite(() => {
    setup( declarations, imports, providers);
  });

  beforeEach(() => {
    ServiceConstants.LOCALE_LANGUAGE = 'en-US';
    fixture = TestBed.createComponent(ActionLink);
    hostComponent = fixture.debugElement.componentInstance;
    hostComponent.element = ActionDropdownLink;
    hostComponent.param = ActionDropdownLink.config;
    pageservice = TestBed.get(PageService);
    configservice = TestBed.get(ConfigService);
  });

  it('should create the ActionLink', async(() => {
    expect(hostComponent).toBeTruthy();
  }));

  it('getAllURLParams() should return null', async(() => {
    expect(hostComponent.getAllURLParams('www.test.com')).toBeFalsy();
  }));

  it('processOnClick() should call processEvent', async(() => {
    spyOn(pageservice, 'processEvent').and.callThrough();
    hostComponent.element.enabled = true;
    hostComponent.processOnClick('test');
    expect(pageservice.processEvent).toHaveBeenCalled();
  }));

  it('processOnClick() should not call processEvent', async(() => {
    spyOn(pageservice, 'processEvent').and.callThrough();
    hostComponent.element.enabled = false;
    hostComponent.processOnClick('test');
    expect(pageservice.processEvent).not.toHaveBeenCalled();
  }));

  it('should have a label set', async(() => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('a.mockLink')).nativeElement.innerText).toBe('Edit');
  }));

  it('should render an external link that opens a new page to google', async(() => {
    hostComponent.element.enabled = true;
    hostComponent.element.config.uiStyles.attributes.value = ComponentTypes.external.toString();
    hostComponent.element.config.uiStyles.attributes.target = '_blank';
    hostComponent.element.config.uiStyles.attributes.rel = 'nofollow';
    hostComponent.url = 'https://google.com/';
    fixture.detectChanges();
    let linkElement = fixture.debugElement.query(By.css('a.mockLink'));
    expect(linkElement.nativeElement.target).toBe('_blank');
    expect(linkElement.nativeElement.rel).toBe('nofollow');
    expect(linkElement.nativeElement.href).toBe('https://google.com/');
  }));

  it('should render an disabled link that is nonfunctional', async(() => {
    hostComponent.element.enabled = false;
    hostComponent.element.config.uiStyles.attributes.value = ComponentTypes.external.toString();
    hostComponent.element.config.uiStyles.attributes.rel = 'nofollow';
    fixture.detectChanges();
    let linkElement = fixture.debugElement.query(By.css('a.mockLink'));
    expect(linkElement.nativeElement.rel).toBe('nofollow');
    expect(linkElement.nativeElement.href).toBe('javascript:void(0)');
    expect(linkElement.nativeElement.classList.contains('disabled')).toBeTruthy();
  }));

  it('should show nm-action-link when a link param visible property is true', async(() => {
    hostComponent.element.visible = true;
    fixture.detectChanges();
    expect(hostComponent.visible).toBeTruthy();
    expect(fixture.debugElement.query(By.css('a.mockLink'))).toBeDefined();
  }));

  it('should hide nm-action-link when a link param visible property is false', async(() => {
    hostComponent.element.visible = false;
    fixture.detectChanges();
    expect(hostComponent.visible).toBeFalsy();
    expect(fixture.debugElement.query(By.css('a.mockLink'))).toBeNull();
  }));
});

class MockElementRef {

}

class MockPageService {
    processEvent(a, b, c) {}
}

const declarations1 = [
  ActionDropdown,
  ActionLink,
  Image,
  Link,
  SvgComponent
];
const imports1 = [
  HttpModule,
  HttpClientTestingModule,
  BrowserAnimationsModule,
  AngularSvgIconModule
];
const providers1 = [
  {provide: ElementRef, useClass: MockElementRef},
  {provide: PageService, useClass: MockPageService},
  { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
  { provide: 'JSNLOG', useValue: JL },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  Location,
  WebContentSvc,
  CustomHttpClient,
  LoaderService,
  ConfigService,
  AppInitService
];

describe('ActionDropdown', () => {
  configureTestSuite(() => {
    setup( declarations1, imports1, providers1);
  });
 
  let payload = '{\"activeValidationGroups\":[], \"config\":{\"code\":\"firstName\",\"desc\":{\"help\":\"firstName\",\"hint\":\"firstName\",\"label\":\"firstName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.Link\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"Link\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":true,\"name\":\"string\",\"collection\":false,\"model\": {"\params\":[{\"activeValidationGroups\":[], \"config\":{\"code\":\"nestedName\",\"desc\":{\"help\":\"nestedName\",\"hint\":\"nestedName\",\"label\":\"nestedName\"},\"validation\":{\"constraints\":[{\"name\":\"NotNull\",\"value\":null,\"attribute\":{\"groups\": []}}]},\"values\":[],\"uiNatures\":[],\"enabled\":true,\"visible\":true,\"uiStyles\":{\"isLink\":false,\"isHidden\":false,\"name\":\"ViewConfig.Link\",\"value\":null,\"attributes\":{\"hidden\":false,\"readOnly\":false,\"alias\":\"Link\",\"labelClass\":\"anthem-label\",\"type\":\"text\",\"postEventOnChange\":false,\"controlId\":\"\"}},\"postEvent\":false},\"type\":{\"nested\":false,\"name\":\"string\",\"collection\":false},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/nestedName\"}]}},\"leafState\":\"testData\",\"path\":\"/page/memberSearch/memberSearch/memberSearch/firstName\"}';     let param: Param = JSON.parse(payload);
  
   
  beforeEach(() => {
      fixture = TestBed.createComponent(ActionDropdown);
      hostComponent = fixture.debugElement.componentInstance;
      hostComponent.element = param;
      pageservice = TestBed.get(PageService);
    });
  
  it('should create the ActionDropdown', async(() => {
    expect(hostComponent).toBeTruthy();
  }));

  it('app should create elementRef property',async(() => {
    expect(hostComponent.elementRef).toBeTruthy();
  }));

  it('toggleOpen() should call dropDownClick.emit()', async(() => {
    const eve: any = {
      preventDefault: () => { }
    };
    spyOn(eve, 'preventDefault').and.callThrough();
    spyOn(hostComponent.dropDownClick, 'emit').and.callThrough();
    hostComponent.toggleOpen(eve);
    expect(eve.preventDefault).toHaveBeenCalled();
    expect(hostComponent.dropDownClick.emit).toHaveBeenCalled();
  }));

  it('processOnClick() should call pageservice.processEvent()',async(() => {
    spyOn(pageservice, 'processEvent').and.callThrough();
    hostComponent.processOnClick('test');
    expect(pageservice.processEvent).toHaveBeenCalled();
  }));

  it('animationStart() should not update isHidden property', async(() => {
    hostComponent.isHidden = true;
    hostComponent.animationStart('test');
    expect(hostComponent.isHidden).toBeFalsy();
  }));

  it('animationDone() should update isHidden property', async(() => {
    hostComponent.isOpen = false;
    hostComponent.isHidden = false;
    hostComponent.animationDone('');
    expect(hostComponent.isHidden).toBeTruthy();
  }));

  it('animationDone() should not update isHidden property', async(() => {
    hostComponent.isOpen = true;
    hostComponent.isHidden = false;
    hostComponent.animationDone('');
    expect(hostComponent.isHidden).toBeFalsy();
  }));

  it('element proprty should be equal to element.enabled', async(() => {
    hostComponent.element.enabled = true;
    expect(hostComponent.enabled).toEqual(true);
  }));

  it('enabled property should not be created', async(() => {
    hostComponent.element.enabled = false;
    expect(hostComponent.enabled).toBeFalsy();
  }));
});